import { PlateType } from './plate-types';

export const plateFormats = {
    //Years
    [PlateType.Y1971_1973]: /^[A-Z]{1}[.][0-9]{3}[.][A-Z]{1}$/,
    [PlateType.Y1973_2008]: /^[A-Z]{3}[-][0-9]{3}$/,
    [PlateType.Y2008_2010]: /^[0-9]{3}[-][A-Z]{3}$/,
    [PlateType.Y2010_present]: /^[0-7][-][A-Z]{3}[-][0-9]{3}$/,

    //Special plates
    [PlateType.AGRICULTURAL]: /^G-L[A-Z]{2}[-][0-9]{3}$/,
    [PlateType.COMMUNITY_POLITICIANS]: /^[E][-][0-9]{3}$/,
    [PlateType.CURRENT_INTERNATIONAL]: /^eur-\d{4}$/,
    [PlateType.DIPLOMAT]: /^[C][D][-][A-Z]{2}[0-9]{3}$/,
    [PlateType.INTERNATIONAL]: /^8-[A-Z]{3}[-][0-9]{3}$/,
    [PlateType.MILITARY]: /^\d{5}$/,
    [PlateType.REPRESENTATIVES]: /^[A][0-9]{3}$/,
    [PlateType.ROYALTY]: /^\d{3}$/,
    [PlateType.SENATORS]: /^[P][0-9]{3}$/,
    [PlateType.TEST_DRIVES]: /^[0-7][-][Z][Z][A-Z][-][0-9]{3}$/,
    [PlateType.TEST_VEHICLE]: /^[Y][-][A-Z]{3}[-][0-9]{3}$/,
} as const;