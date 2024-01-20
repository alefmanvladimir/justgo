export type SearchRide = {
    departure: string,
    destination: string,
    date: Date | null,
    numberOfSeats: number
}

export function getEmptySearchRide(): SearchRide {
    return {
        departure: "",
        destination: "",
        date: new Date(),
        numberOfSeats: 1
    }
}

export default SearchRide