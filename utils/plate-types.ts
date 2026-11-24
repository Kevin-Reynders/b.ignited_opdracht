//Calling this platetypes instead of dealers since it sounds nicer and is more understandable then dealer
export const plateTypes = {
    //Years
    Y1971_1973: '1971-1973',
    Y1973_2008: '1973-2008',
    Y2008_2010: '2008-2010',
    Y2010_present: '2010-present',

    //Special plates
    AGRICULTURAL: 'agricultural',
    COMMUNITY_POLITICIANS: 'community politicians',
    CURRENT_INTERNATIONAL: 'current international',
    DIPLOMAT: 'diplomat',
    INTERNATIONAL: 'international',
    MILITARY: 'military',
    REPRESENTATIVES: 'representatives',
    ROYALTY: 'royalty',
    SENATORS: 'senators',
    TEST_DRIVES: 'test drives',
    TEST_VEHICLE: 'test vehicle',
} as const;

export type PlateType = (typeof plateTypes)[keyof typeof plateTypes];

//export const ALL_PLATE_TYPES: Object.values(plateTypes);