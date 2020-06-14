import * as React from 'react'
import Link from 'next/link'
import { ITab } from '../interfaces/index'
import _ from 'lodash'

type LinkProps = {
  tab: ITab,
  idx?: number
}

const NavLink: React.FunctionComponent<LinkProps> = ({
  tab,
}) => (
  <>
    <Link href={tab.link}>
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

export default NavLink