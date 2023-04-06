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
export const formatNpmrc = ({scopes = {}, root = {}, format}: INpmrcData): string => {
  const config: Record<string, string> = {}
  const registry = normalizeRegistry(root.registry || 'registry.npmjs.org')

  for (const [name, scope] of Object.entries(scopes)) {
    for (const [k, v] of Object.entries(scope)) {
      if (k === 'registry') {
        config[`@${normalizeScope(name)}:${k}`] = v as string
        continue
      }
      config[`${normalizeRegistry(scope.registry)}:${normalizeKey(k)}`] =  v || 'true'
    }
  }

  for (const [_k, v, k = normalizeKey(_k)] of Object.entries(root)) {
    if (format === 'npm9' && credKeys.has(k)) {
      config[`${registry}:${k}`] = v || 'true'
      continue
    }
    config[k] = v || 'true'
  }

  return encode(config)
}

const normalizeRegistry = (value: string): string => value
  .replace(/^(https?:\/\/)?/, '//')
  .replace(/\/*$/, '/')

const normalizeScope = (value: string): string => value.replace(/^@/, '')
const normalizeKey = (value: string): string =>
  credAliases.has(value)
    ? `_${value}`
    : value
