
import { switchChain ,getConnections} from '@wagmi/core'
import { Menu, Dropdown, Button } from "antd";
import { useState,useEffect } from 'react';
import { DownOutlined } from "@ant-design/icons";
import { config } from '../index';
import { mainnet, bsc,polygon } from '@wagmi/core/chains'

    const menuItems = [
        {
            key: "1",
            value: "Ethereum",
         //   icon: <ETHLogo />,
        },
        {
            key: "38",
            value: "BSC",
           // icon: <ETHLogo />,
        },

    ]




	function Chains() {


    const [selected, setSelected] = useState({});

	const connections = getConnections(config)

	const {  chainId  } = switchChain(config,{
		chainId: [mainnet.id,bsc.id,polygon.id ],
		addEthereumChainParameter: { 
			iconUrls: ['https://example.com/icon.png'], 
		  }, 
		  connector: connections[0]?.connector, 
	  });




    const handleMenuClick = async (e) => {
		try {
			console.log("switch to: ", e.key);
	//	switchChain(e.key);
		await switchChain({ chainId: e.key});
		} catch (_error) {
			console.log(_error);
			handleMenuClick(e);
		}
	};

	useEffect(() => {
		if (!chainId) return ;
		const newSelected = menuItems.find((item) => item.key === chainId);
		setSelected(newSelected);
		console.log("current chainId: ", chainId);
	}, [chainId]);



    const menu = (
		<Menu onClick={handleMenuClick}>
			{menuItems.map((item) => (
				<Menu.Item key={item.key} icon={item.icon} >
					<span>{item.value}</span>
				</Menu.Item>
			))}
		</Menu>
	);



return(
<div>
			<Dropdown overlay={menu} trigger={["click"]}>
				<Button
					key={selected?.key}
					icon={selected?.icon}
					>
					<span style={{ marginLeft: "5px" }}>{selected?.value}</span>
					<DownOutlined />
				</Button>
			</Dropdown>
		</div>



)

}

export default Chains;