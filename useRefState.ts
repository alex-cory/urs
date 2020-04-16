import { useCallback, useRef, useState, useEffect } from 'react'

/**
 * Determines if the given param is an object. {}
 * @param obj
 */
export const isObject = (obj: any): obj is object => Object.prototype.toString.call(obj) === '[object Object]' // eslint-disable-line

const useMounted = () => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false 
    }
  }, [])
  return mounted
}

export const useRefState = (defaultState: any, blockIfUnmounted: boolean = true) => {
  const mounted = useMounted()
  const state = useRef(defaultState)
  const setReactState = useState(state.current)[1]
  const setState = useCallback(arg => {
    if (!mounted.current && blockIfUnmounted) return
    state.current = (typeof arg === 'function') ? arg(state.current) : arg
    setReactState(state.current)
  }, [])
  return [state, setState]
}

export default useRefState
