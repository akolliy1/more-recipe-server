const trimData = (params, value) => {
    return (params || '').trim()
    .replace(/\s/g, value || '')
}
export default trimData;