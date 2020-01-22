import React from "react";
import "./Oficina.scss";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

const Oficina = ({ name, waiting, elapsed, isOnline }) => {
	const off = isOnline ? "" : "--off";
	return (
		<div className="zq__card">
			<div className={"zq__card__header" + off}>{name}</div>
			<div className={"zq__card__footer" + off}>
				<div className="zq__card__footer__waiting">
					<AiOutlineUser />
					<span>
						{waiting}
					</span>
				</div>
				<div className="zq__card__footer__elapsed">
					<FaRegClock />
					<span>
					{new Date(elapsed * 1000)
						.toISOString()
						.substr(14, 5)}
					</span>
				</div>
			</div>
		</div>
	);
};

export { Oficina };
