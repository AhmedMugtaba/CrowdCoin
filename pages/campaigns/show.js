import React, { Component } from 'react';
import { Card, Grid, Button, Icon, Header} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
	static async getInitialProps(props){
		const campaign = Campaign(props.query.address);

		const summary = await campaign.methods.getSummary().call();

		return {
			address: props.query.address,
			minimumContribution: summary[0],
			balance: summary[1],
			requestsCount: summary[2],
			approversCount: summary[3],
			manager: summary[4]
		};
	}

	renderCards () {
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = this.props;

		const items = [
			{
				header: manager,
				meta:<Header as='h4' color='grey'>Address of Manager</Header>,
				// description: '',
				style: { overflowWrap: 'break-word'}


			},
			{
				header: minimumContribution,
				meta: <Header as='h4' color='grey'>Minimum Contribution in (wei)</Header>,
				// description: 'You must contribute at least this much wei to support this campaign',

			},
			{
				header: requestsCount,
				meta:<Header as='h4' color='grey'>Number of Requests</Header>,
				// description: 'A number of requests to withdrwa money from this campaign',

			},
			{
				header: approversCount,
				meta:   <Header as='h4' color='grey'>Number of Backers</Header>,
				// description: '',

			},
			{
				header: 0,
				meta:   <Header as='h4' color='grey'>Number of Approvers</Header>,
				// description: '',

			},
			{
				header: web3.utils.fromWei(balance, 'ether'),
				meta: <div>
						<Grid relaxed='very' columns={3}>
   						 <Grid.Column>
						<Icon size='large' color='yellow' name='bitcoin' /> 
						 </Grid.Column>
						 <Grid.Column>
						<Icon size='large' color='red' name='heart' />
						</Grid.Column>
						<Grid.Column>
						<Icon size='large' color='blue' name='thumbs outline up' />
						</Grid.Column>
						</Grid>
					</div>,
				// description: '',

			}


		];

		return <Card.Group items={items} />;
	}
	render() {
		return (
			<Layout>
			<h3>Campaign Show</h3>
		<Grid>
			<Grid.Row>
			    <Grid.Column width={10}>
			     	{this.renderCards()}
			    	</Grid.Column>
			    <Grid.Column width={6}>
			     	<ContributeForm address={this.props.address}/>
			    	</Grid.Column>
			    </Grid.Row>
				
				<Grid.Row>
				<Grid.Column>
					<Link route={`/campaigns/${this.props.address}/requests`}>
				      <a>
	                  <Button primary >View Requests</Button>
	                </a>
	              	</Link>
	            </Grid.Column>
				</Grid.Row>

		</Grid>
			</Layout>
			);
	}
}

export default CampaignShow;
