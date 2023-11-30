export const localStoragePlugin = (store) => {
    // Load state from local storage when the Vuex store is initialized
    const storedState = localStorage.getItem('myStore');
    if (storedState) {
        store.replaceState(JSON.parse(storedState));
    }

    // Save the state to local storage whenever a mutation is committed
    store.subscribe((mutation, state) => {
        localStorage.setItem('myStore', JSON.stringify(state));
    });
};