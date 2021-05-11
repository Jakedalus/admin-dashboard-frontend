import React from 'react';
import styled from 'styled-components';
import TotalsPanel from './TotalsPanel';

const StyledAdmin = styled.main`height: 100vh;`;

const AdminPanel = () => {
	return (
		<StyledAdmin>
			<TotalsPanel />
		</StyledAdmin>
	);
};

export default AdminPanel;
