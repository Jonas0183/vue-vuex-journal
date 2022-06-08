import { createStore } from 'vuex'
import { shallowMount } from "@vue/test-utils";

import { journalState } from "../../../mock-data/test-journal-state";

import journal from "@/modules/daybook/store/journal";
import EntryList from "@/modules/daybook/components/EntryList";

const createVuexStore = ( inicialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...inicialState }
            }
        }
    })

describe('Pruebas en el componente EntryList', () => {
    
    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper
    beforeEach( () => {

        jest.clearAllMocks()

        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        } )

    })
    test('Debe llamar al getEntriesByTerm sin termino y mostrar 2 entradas', () => {

        expect( wrapper.findAll('entry-stub').length).toBe(2)
        expect( wrapper.html()).toMatchSnapshot()
    })
    test('Debe llamar al getEntriesByTerm y filtrar las entradas', async () => {

        const input = wrapper.find('input')
        await input.setValue('segunda')

        expect( wrapper.findAll('entry-stub').length).toBe(1)
    })
    test('El boton de nuevo, debe redireccionar a /new', () => {
        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith( { name: 'entry', params: { id: 'new' } } )
    })

})