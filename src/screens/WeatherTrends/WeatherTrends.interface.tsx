interface CountrySearchResult {
    flag: string;
    common: string;
    official: string;
    latitude: number;
    longitude: number;
    countryCode: string;
}

interface LocationDrawerInterface {
    drawerState: boolean;
    alterDrawerState: CallableFunction;
    addCountry: CallableFunction;
    deleteCountry: CallableFunction;
}

interface CountryInfoCardInterface {
    country: CountrySearchResult;
    selectionHandler: CallableFunction;
}

interface CountryInfoCardWatchlistInterface {
    country: CountrySearchResult;
    removalHandler: CallableFunction;
    currentSelectedCountry: string;
    selectionHandler: CallableFunction;
}