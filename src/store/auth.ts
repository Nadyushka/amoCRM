import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuth: false,
        baseUrl: null,
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRmM2Y3NWQyYmI1YTY5NTFhZmI0OGEzYmEwZjRmNmYzYzBlYTBiYjZiZjcyZGJiMTRlYzg4ZjBhY2Q3YWVjNGMzMzU5NzEwNDdmY2YwNmRiIn0.eyJhdWQiOiIxMmU3MjkyZi0zMmNhLTQ3MmMtYjI3Mi01NjVjYmI5ZTczMzciLCJqdGkiOiJkZjNmNzVkMmJiNWE2OTUxYWZiNDhhM2JhMGY0ZjZmM2MwZWEwYmI2YmY3MmRiYjE0ZWM4OGYwYWNkN2FlYzRjMzM1OTcxMDQ3ZmNmMDZkYiIsImlhdCI6MTcwNzY1MTI5MCwibmJmIjoxNzA3NjUxMjkwLCJleHAiOjE3MDc3Mzc2OTAsInN1YiI6IjcxMTI2MjkiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzE1NTA5ODYsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSJdLCJoYXNoX3V1aWQiOiI1OWYxOGFhMi1lMjdjLTRlODItYjVkMy1jZmY2MTI2NzY0Y2YifQ.QQyg5u3zwok_n__A458V0qCAKX_eeMaVF0H8T65e99G4NSOWSuh9RL9AURKs0j-7dia5l8rs2P8TCd4kg6nc9fq4MKC_f_FTrnsiDDsCydu3LgVgpVrXEMO0wQi1iGKq_tOPEk7m7UsihPSteuKuD7lAHIyRgRhs6ReQpVXMdbKD2zdmPXh1ZKYURNgGxi6U16EQT1eQnnA65Ut9P6XDg65wJcL4ygIuq_w_AsJ-_YPpetK4gYXW1dQIx_khSnMr5Y_z3xJg7HBLN9XnvtJ0-pNR848T5jjA2xqz_71wMIrzPAWhMpdoL1gdZ3xghPuj2cwyEpLvmp1wH3UbCdc-WA',
        error: null as null | string,
        isLoading: false,
    }),

    actions: {
        async auth() {
            try {
                this.isLoading = true
                const res = await axios.get('https://test.gnzs.ru/oauth/get-token.php', {
                    headers: {
                        'X-Client-Id': '31550986'
                    }
                })

                this.accessToken = res.data.access_token
                this.baseUrl = 'https://' + res.data.base_domain + '/api/v4/'

            } catch (error) {

            } finally {
                this.isLoading = false
            }
        }
    },
});
