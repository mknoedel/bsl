import * as React from 'react'
import Link from 'next/link'
import { ITab } from '../interfaces/index'
import _ from 'lodash'
import tabPath from '../utils/tabPath'
import getTabLink from '../utils/getTabLink'

type LinkProps = {
  tab: ITab,
  idx?: number
}

const TabLink: React.FunctionComponent<LinkProps> = ({
  tab,
}) => (
  <>
    <Link href={`${tabPath}[id]`} as={getTabLink(tab.name)}>
      <a>{tab.name}</a>
    </Link>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <style jsx>{`
        a {
          font-family: 'Arial';
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
  </>
)

export default TabLink