import React from 'react';
import Header from '../Header';
import SidePanel from './SidePanel';
import TotalsPanel from './TotalsPanel';

const AdminPanel = () => {
	return (
		<div>
			<Header />
			<SidePanel />
			<TotalsPanel />
		</div>
	);
};

export default AdminPanel;
