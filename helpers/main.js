const fetcher = async url => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = await new Error("An error occurred while fetching the data.")

        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json()
}


module.exports = {
    fetcher
}