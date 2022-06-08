import { createStore } from 'vuex'
import journal from "@/modules/daybook/store/journal";
import { journalState } from '../../../../mock-data/test-journal-state';


const createVuexStore = ( inicialState ) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...inicialState }
        }
    }
})

describe('Vuex - Pruebas en el store del modulo', () => {

    // basicas ======================================================
    test('Este debe ser el estado inicial de nuestro state', () => {

        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })

    // mutations =====================================================

    test('mutation: setEntries', () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit( 'journal/setEntries', journalState.entries )
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()

    })
    test('mutation:updateEntry', () => {
        // create store con entradas
        const store = createVuexStore( journalState )
        // updatedEntry
        const updatedEntry = {
            id: '-N3-YmcCS-bv6C5MUQgs',
            date: 1653571779641,
            picture: "https://res.cloudinary.com/dqrdwglbm/image/upload/v1653571790/tbqr7xxrd5jqz9ehxeya.jpg",
            text: "hola mundo desde pruebas"
        }
        // commit mutacion
        store.commit('journal/updateEntry', updatedEntry)
        const storeEntries = store.state.journal.entries
        // Expects 
        // entries.length = 2
        expect( storeEntries.length ).toBe(2)
        // entries tiene que existir updatedEntrie toEqual
        expect( storeEntries.find( e => e.id === updatedEntry.id )).toEqual( updatedEntry )
    })

    // no hace el commit de addEntry... ¿¿??
    // test('Mutation:addEntry deleteEntry',() => {
    //     // create store con entradas
    //     const store = createVuexStore( journalState )
    //     // commit addEntry {id: 'ABC-123', text:'Hola mundo'}
    //     const stateEntries = store.state.journal.entries
    //     store.commit('journal/addEntry', { id: 'ABC-123', text: 'Hola mundo' })
    //     // Expects
    //     // 3 entradas
    //     expect( stateEntries.length ).toBe(3)
    //     // la entrada nueva existe
    //     expect( stateEntries.find( e => e.id === 'ABC-123')).toBeTruthy()
        
    //     // commit deleteEntry 'ABC-123'
    //     store.commit('journal/deleteEntry', 'ABC-123')
    //     // expects
    //     // 2 entradas
    //     expect( stateEntries.length ).toBe(2)
    //     // entrada 'ABC-123' no existe
    //     expect( stateEntries.find( e => e.id === 'ABC-123')).toBeFalsy()
    // })
    
    // Getters ==============================================================

    test('Getters: getEntriesByTerm getEntryById', ()=> {

    const store = createVuexStore( journalState )
    const [entry1, entry2] = journalState.entries

    expect( store.getters['journal/getEntriesByTerm']('').length).toBe(2)
    expect( store.getters['journal/getEntriesByTerm']('mundo').length).toBe(1)

    expect( store.getters['journal/getEntriesByTerm']('mundo')).toEqual([entry1])

    expect( store.getters['journal/getEntryById']('-N3-YqQPEfrX5MEjXwT9')).toEqual(entry2)

    })

    // Actions =====================================================================

    test('Actions: loadEntries', async() => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2)

    })

    test('Actions: updateEntry', async() => {

        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-N3-YmcCS-bv6C5MUQgs',
            date: 1653571779641,
            picture: "https://res.cloudinary.com/dqrdwglbm/image/upload/v1653571790/tbqr7xxrd5jqz9ehxeya.jpg",
            text: "hola mundo desde pruebas mock", 
            otro: ''

        }
        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( 
            store.state.journal.entries.find( e => e.id === updatedEntry.id)
        ).toEqual({ id: '-N3-YmcCS-bv6C5MUQgs',
        date: 1653571779641,
        picture: "https://res.cloudinary.com/dqrdwglbm/image/upload/v1653571790/tbqr7xxrd5jqz9ehxeya.jpg",
        text: "hola mundo desde pruebas mock"})

    })

    test('Actions: createEntry deleteEntry', async() => {

        const store = createVuexStore( journalState )

        //newEntry = { date: 1653571795839, text: 'entrada de prueba'}

        const newEntry = { date: 1653571795839, text: 'entrada de prueba'}

        // dispatch de la accion createEntry con nueva entrada
        //obtener id nueva entrada

        const newEntryId = await store.dispatch('journal/createEntry', newEntry)

        //el id debe ser string
        expect( typeof(newEntryId) ).toBe('string')
        // la nueva entrada debe existir en state.journal.entries....
        expect( 
            store.state.journal.entries.find( e => e.id === newEntryId)
        ).toBeTruthy()

        // 2ª parte
        //dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', newEntryId)
        // la nueva entrada no debe existir en state.journal.entries....
        expect( 
            store.state.journal.entries.find( e => e.id === newEntryId)
        ).toBeFalsy()



    })

})