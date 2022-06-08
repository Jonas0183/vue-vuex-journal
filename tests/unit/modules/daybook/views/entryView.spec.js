import { createStore } from 'vuex'
import { shallowMount } from "@vue/test-utils";

import Swal from 'sweetalert2'

import { journalState } from "../../../mock-data/test-journal-state";
import journal from "@/modules/daybook/store/journal";

import EntryView from "@/modules/daybook/views/EntryView";

const createVuexStore = ( inicialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...inicialState }
            }
        }
    })
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe( 'Pruebas en el EntryView', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()
    const mockRouter = {
        push: jest.fn()    
    }
    let wrapper

    beforeEach( () => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-N3-YqQPEfrX5MEjXwT9'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        } )
    })

    // test( 'Debe sacar al usuario cuando el id no existe', () => {

    //     const wrapper = shallowMount( EntryView, {
    //         props: {
    //             id: ''
    //         },
    //         global: {
    //             mocks: {
    //                 $router: mockRouter
    //             },
    //             plugins: [ store ]
    //         }
    //     } )
    // })

    test('Debe mostrar la entrada correctamente', () => {

        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()

    })

    test('Debe borrar la entrada y salir', (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve( { isConfirmed: true } ) )
        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se podrá recuperar.',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro.'
        })
        setTimeout( () =>{
            expect( mockRouter.push ).toHaveBeenCalled()
            expect( store.dispatch ).toBeCalledWith('journal/deleteEntry', '-N3-YqQPEfrX5MEjXwT9')

        }, 1 )
        done()  
    })
})