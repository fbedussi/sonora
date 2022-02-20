import React from 'react'
import styled from 'styled-components'

import theme from '../styleguide/theme'

const Wrapper = styled.header`
	height: ${theme.spacing(6)};
	padding: ${theme.spacing(1)};
	border-bottom: solid 1px ${theme.palette.grey[300]};
	text-align: center;
`

const Logo = styled.img`
	width: auto;
	height: 100%;
`
type Props = {
	title: string
}

const Header: React.FC<Props> = ({ title }) => {
	return (
		<Wrapper>
			<Logo src="/logotype.svg" />
		</Wrapper>
	)
}

export default Header
