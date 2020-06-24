import tabPath from "./tabPath"
import _ from "lodash"

export default (tabName: string): string | undefined => {return tabName ? `${tabPath}${_.kebabCase(tabName)}` : undefined}
