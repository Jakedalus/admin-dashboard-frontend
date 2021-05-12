import React from 'react';
import styled from 'styled-components';
import TotalsPanel from './TotalsPanel';

const StyledAdmin = styled.main`height: 100vh;`;

const AdminPanel = ({ admin, users, courses }) => {
	return (
		<StyledAdmin>
			<TotalsPanel
				admin={admin}
				users={users}
				courses={courses}
			/>
		</StyledAdmin>
	);
};

export default AdminPanel;
