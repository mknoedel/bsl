import * as React from 'react'
import { ITab } from '../interfaces/index'
import _ from 'lodash'
import tabs from '../utils/tabs'
import NavLink from './NavLink'


const Nav: React.FunctionComponent<{}> = () => (
  <header>
    <nav>
      {_.map(tabs, (tab: ITab, idx: number) => <NavLink tab={tab} idx={idx} key={idx}/>)}
    </nav>
  </header>
)

export default Nav
