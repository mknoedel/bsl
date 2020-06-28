import tabPath from "./tabPath"
import _ from "lodash"

export default (tabName: string | undefined): string | undefined => {return tabName ? `${tabPath}${_.kebabCase(tabName)}` : undefined}
