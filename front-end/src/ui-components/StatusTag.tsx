// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { ReactNode } from 'react';
import { Label, SemanticICONS } from 'semantic-ui-react';
import { bountyStatus, bountyStatusMap, motionStatus, proposalStatus, referendumStatus, tipStatus, tipStatusMap } from 'src/global/statuses';

interface Props{
	children?: ReactNode,
	className?: string,
	content?: string,
	icon?: string,
	status: string
}

const StatusTag = ({ children, className, content, status }: Props) => {

	let icon: SemanticICONS = 'circle';

	if ([referendumStatus.PASSED,
		referendumStatus.STARTED,
		proposalStatus.PROPOSED,
		motionStatus.PROPOSED,
		motionStatus.APPROVED,
		tipStatus.OPENED,
		tipStatus.CLOSING,
		bountyStatus.PROPOSED,
		bountyStatus.AWARDED,
		bountyStatus.BECAME_ACTIVE,
		bountyStatus.EXTENDED,
		'prime'
	].includes(status)){
		icon = 'circle';
	}

	if ([proposalStatus.CLEARED,
		referendumStatus.CANCELLED,
		referendumStatus.NOTPASSED,
		referendumStatus.VETOED,
		motionStatus.DISAPPROVED,
		tipStatus.RETRACTED,
		bountyStatus.CANCELED,
		bountyStatus.REJECTED
	].includes(status)){
		icon = 'times';
	}

	if ([proposalStatus.TABLED,
		referendumStatus.EXECUTED,
		motionStatus.APPROVED,
		motionStatus.EXECUTED,
		motionStatus.CLOSED,
		tipStatus.CLOSED,
		bountyStatus.AWARDED,
		bountyStatus.CLAIMED
	].includes(status)){
		icon = 'check';
	}

	if (content && tipStatusMap[content]) {
		content = tipStatusMap[content];
	}

	if (content && bountyStatusMap[content]) {
		content = bountyStatusMap[content];
	}

	return (
		<Label
			className={className}
			icon={icon}
			content={content}
			status={status}
		>
			{children}
		</Label>

	);
};

export default styled(StatusTag).attrs(( { status }: Props) => ({
	className: status,
	content: status
}))`
	&.ui.label {
		font-size: xs;
		font-weight: 500;
		background-color: white;
		color: grey_primary;
		border-style: solid;
		border-width: 1px;
		border-radius: 0.2rem;
		letter-spacing: 0.05rem;
		text-transform: capitalize;
		padding: 0.5rem 1rem;
		&.${referendumStatus.STARTED},
		&.${proposalStatus.PROPOSED},
		&.${motionStatus.PROPOSED},
		&.${tipStatus.OPENED},
		&.${tipStatus.CLOSING},
		&.${bountyStatus.PROPOSED},
		&.${bountyStatus.AWARDED},
		&.${bountyStatus.BECAME_ACTIVE},
		&.${bountyStatus.EXTENDED}
		 {
			border-color: blue_primary;
			color: blue_primary;
		}
		&.${proposalStatus.TABLED},
		&.${referendumStatus.PASSED},
		&.${referendumStatus.EXECUTED},
		&.${motionStatus.EXECUTED},
		&.${motionStatus.APPROVED},
		&.${motionStatus.CLOSED},
		&.${tipStatus.CLOSED},
		&.${bountyStatus.AWARDED},
		&.${bountyStatus.CLAIMED},
		&.prime {
			border-color: green_primary;
			color: green_primary;
		}
		&.${proposalStatus.CLEARED},
		&.${referendumStatus.CANCELLED},
		&.${referendumStatus.NOTPASSED},
		&.${referendumStatus.VETOED},
		&.${motionStatus.DISAPPROVED},
		&.${tipStatus.RETRACTED},
		&.${bountyStatus.CANCELED},
		&.${bountyStatus.REJECTED} {
			border-color: red_primary;
			color: red_primary;
		}
	}
`;
