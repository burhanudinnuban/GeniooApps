import { FETCH_PRODUCTS } from '../actions/types';

const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                items: action.payload[0]
            }
        default:
            return state
    }
}