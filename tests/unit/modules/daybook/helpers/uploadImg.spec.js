import axios from 'axios'
import cloudinary from 'cloudinary'

import uploadImg from "@/modules/daybook/helpers/uploadImg";

cloudinary.config({
    cloud_name: 'dqrdwglbm',
    api_key: '126128154582819',
    api_secret: 'PTzRm6aWCpGYk41bfn6tDNMbH0I'
})

describe('Pruebas en el uploadImg', () => {

    test('Debe cargar un archivo y devolver su url', async( done ) => {

        const { data } =  await axios.get('https://res.cloudinary.com/dqrdwglbm/image/upload/v1653571806/z1d4vwfwpqilkkliq9ft.png', {
            responseType: 'arraybuffer'
        })

        const file = new File( [ data ], 'foto.png')

        const url = await uploadImg( file )

        expect( typeof url ).toBe('string')

        // conseguir id
        const segments = url.split('/')
        const imgId = segments[ segments.length -1 ].replace('.png','')
        cloudinary.v2.api.delete_resources( imgId, {}, () => {
            done()
        })
    })

})