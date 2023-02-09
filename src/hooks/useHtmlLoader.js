const useHtmlLoader = (fetchHook, html, arg = null) => {
    const { data, error } = fetchHook(arg);
    if(error) {
        console.log(error)
        return 'error loading data'
    }
    if(!data) return 'loading data'
    if(data.length === 0) return 'RLS enabled. Login to gain access.'
    return html(data)
}

export default useHtmlLoader;