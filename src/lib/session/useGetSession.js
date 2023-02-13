import { useCallback } from "react";
import supabase from "../../config/supabaseClient";

export default function useGetSession() {
    return useCallback(async () => {
        return await supabase.auth.getSession();
            // if(error) {
            //     console.log(error.message);
            //     return ;
            // }
            // if(data) {         
            //     // setSession();
            //     return {session: data};
            // }
    })
}