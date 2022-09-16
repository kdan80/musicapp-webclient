import React from 'react'
import Layout from 'components/Layout'

const register = () => {

    return (
        <Layout>
            
            <form>

                <input type='text' placeholder='username' required />
                <input type='password' placeholder='password' required />

            </form>

        </Layout>
    )
}

export default register