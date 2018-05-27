export default (params, value) => {
  return (params || '').trim()
    .replace(/\s+/g, value || '')
}
