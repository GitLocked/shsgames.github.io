import { Col, Container, Footer, FooterCopyright, Row } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";
import DiscordInvite from "react-discord-invite";
import { Link } from "react-router-dom";
import { client } from "../runtime/util/offlineInstaller";

export function MoTD(): JSX.Element | null {

	type State = { motd: string } | null;

	// Initialize state
	const [ state, setState ] = useState<State>(null);

	// Have state sync with server every second while component is mounted
	useEffect(function() {
		if (state === null) fetch("https://joshm.us.to/api/v1/motd").then(resp => resp.json())
			.then(setState);
	});

	// If loading
	if (state === null) return null;

	// Return motd
	return <p>{state!.motd}</p>;

}

export default function Component(): JSX.Element {
	return (
		<Footer className="theme--dark">
			<Container>
				<Row>
					<Col xl={4}>
						<Link to={`/${location.search}`}>
							<div className="title">
								<h3>{ APP_MANIFEST.name }</h3>
							</div>
						</Link>
						<MoTD/>
						<br />
						<p>
					
						</p>
					</Col>
					<Col xl={4}>
						
				</Row>
			</Container>
			<FooterCopyright>
				<div style={{ paddingLeft: 8 }}>
					<div style={{ display: "inline-flex", alignItems: "start", flexDirection: "column" }}>
						<span>Gitlock 2021-{(new Date).getFullYear()}</span>
						<div>
							<a href="//github.com/gitlocked/." className="link">Gitlocked</a> • <a href="" className="link"></a>
						</div>
					</div>
					<div style={{ alignItems: "start", flexDirection: "column", marginLeft: "auto", display: "table", marginTop: "-26px", transform: "translateY(-4px)" }}>
						Version: <code>v{APP_MANIFEST.version}-{parseInt(client.substr(0, 8), 16) % 255}</code>
					</div>
				</div>
			</FooterCopyright>
		</Footer>
	);
}
