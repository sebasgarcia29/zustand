import { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/teslo.api';


export const RequestInfo = () => {

    const [info, setInfo] = useState<unknown>()

    useEffect(() => {

        tesloApi.get('/auth/private')
            .then(resp => setInfo(resp.data))
            .catch(() => setInfo('error'))

    }, [])



    return (
        <>
            <h2>Request Info</h2>
            <pre>
                {JSON.stringify(info, null, 2)}
            </pre>
        </>
    )
}


