import React from 'react'
import styled from 'styled-components'

import { AppBar, Toolbar, Typography } from '../styleguide'

const Logo = styled.img`
	width: 2rem;
	height: 2rem;
`
type Props = {
	title: string
}

const Header: React.FC<Props> = ({ title }) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Logo src="/logo.svg" />
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, textTransform: 'capitalize' }}
				>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header
