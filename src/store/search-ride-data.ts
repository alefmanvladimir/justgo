import { atom } from "nanostores";
import SearchRide, { getEmptySearchRide } from "../models/search-ride";

export const searchRideData = atom<SearchRide>(getEmptySearchRide())

export function setSearchRide(_data: SearchRide) {
    searchRideData.set({... _data})
}