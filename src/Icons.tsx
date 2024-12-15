import CreditSVG, { ReactComponent as CreditComp } from './assets/credit.svg'
import DeleteSVG, { ReactComponent as DeleteComp } from './assets/delete.svg'
import EditSVG, { ReactComponent as EditComp } from './assets/edit.svg'
import PayIDSVG, { ReactComponent as PayIDComp } from './assets/payid.svg'
import SaveSVG, { ReactComponent as SaveComp } from './assets/save.svg'
import SpendSVG, { ReactComponent as SpendComp } from './assets/spend.svg'

export const CreditIcon = CreditComp || CreditSVG;
export const DeleteIcon = DeleteComp || DeleteSVG;
export const EditIcon = EditComp || EditSVG;
export const PayIDIcon = PayIDComp || PayIDSVG;
export const SaveIcon = SaveComp || SaveSVG;
export const SpendIcon = SpendComp || SpendSVG;
