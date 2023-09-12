
export const isAdminAuthenticated = () => {
    fetch(`/api/v1/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        }
    })
        .then(response => {
            console.log('response',response.json())
            return true
        })
        .catch(err => {
            return false
        })
}