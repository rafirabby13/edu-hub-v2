import { useEffect } from 'react'

import { axiosSecure } from './useAxiosConfig';
import useAuth from './useAuth';



const useAxiosSecure = () => {

    const {logoutUser} = useAuth()
    // console.log(user)

    // if (!context) {
    //     throw new Error("useAxiosSecure must be used within an AuthProvider");
    // }

    // const { logoutUser } = context;

    useEffect(() => {
        axiosSecure.interceptors.response.use((config) => {
            console.log("object", config)
            return config
        }, (error) => {
            console.log(error.response.status)
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                logoutUser()
                    .then(() => {
                        console.log("need to logout user ")

                    })
                    .catch(err=>{
                        console.log(err)
                    })

            }

            return Promise.reject(error)

        })
    }, [logoutUser])



    return axiosSecure
}

export default useAxiosSecure
