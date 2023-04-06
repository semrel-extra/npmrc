import {encode} from 'ini'

export interface INpmrcData {
  format?: string,
  root?: Record<string, string>,
  scopes?: Record<string, {
    registry: string
    auth?: string
    authToken?: string
    username?: string
    password?: string
    [i: string]: string | undefined
  }>
}

const credKeys = new Set(['_auth', '_authToken', 'username', '_password'])
const credAliases = new Set(['auth', 'authToken', 'password'])

// https://docs.npmjs.com/cli/v9/configuring-npm/npmrc
export const formatNpmrc = ({scopes, root, format}: INpmrcData): string =>
  encode({
    ...formatRoot(root, format),
    ...formatScopes(scopes)
  })

const formatRoot = (data: INpmrcData['root'] = {}, format?: string): Record<string, string> => {
  const registry = normalizeRegistry(data?.registry || 'registry.npmjs.org')
  const config: Record<string, string> = {}

  for (const [_k, v, k = normalizeKey(_k)] of Object.entries(data)) {
    if (format === 'npm9' && credKeys.has(k)) {
      config[`${registry}:${k}`] = v || 'true'
      continue
    }
    config[k] = v || 'true'
  }
  return config
}

const formatScopes = (data: INpmrcData['scopes'] = {}): Record<string, string> => {
  const config: Record<string, string> = {}

  for (const [name, scope] of Object.entries(data)) {
    for (const [k, v] of Object.entries(scope)) {
      if (k === 'registry') {
        config[`@${normalizeScope(name)}:${k}`] = v as string
        continue
      }
      config[`${normalizeRegistry(scope.registry)}:${normalizeKey(k)}`] =  v || 'true'
    }
  }
  return config
}

const normalizeRegistry = (value: string): string => value
  .replace(/^(https?:\/\/)?/, '//')
  .replace(/\/*$/, '/')

const normalizeScope = (value: string): string => value.replace(/^@/, '')
const normalizeKey = (value: string): string =>
  credAliases.has(value)
    ? `_${value}`
    : value
