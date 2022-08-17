import { Badge, Group, Stack, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import { HyperlinkedText } from './HyperlinkedText';
import { TSDoc } from './tsdoc/TSDoc';
import type { DocItem } from '~/DocModel/DocItem';
import type { AnyDocNodeJSON } from '~/DocModel/comment/CommentNode';
import type { TokenDocumentation } from '~/util/parse.server';

export enum CodeListingSeparatorType {
	Type = ':',
	Value = '=',
}

export function CodeListing({
	name,
	separator = CodeListingSeparatorType.Type,
	typeTokens,
	readonly = false,
	optional = false,
	summary,
	comment,
	children,
}: {
	name: string;
	separator?: CodeListingSeparatorType;
	typeTokens: TokenDocumentation[];
	readonly?: boolean;
	optional?: boolean;
	summary?: ReturnType<DocItem['toJSON']>['summary'];
	comment?: AnyDocNodeJSON | null;
	children?: ReactNode;
}) {
	return (
		<Stack spacing="xs" key={name}>
			<Group>
				{readonly ? <Badge variant="filled">Readonly</Badge> : null}
				{optional ? <Badge variant="filled">Optional</Badge> : null}
				<Title order={4} className="font-mono">
					{name}
				</Title>
				<Title order={4}>{separator}</Title>
				<Title order={4} className="font-mono break-all">
					<HyperlinkedText tokens={typeTokens} />
				</Title>
			</Group>
			<Group>
				{summary && <TSDoc node={summary} />}
				{comment && <TSDoc node={comment} />}
				{children}
			</Group>
		</Stack>
	);
}
