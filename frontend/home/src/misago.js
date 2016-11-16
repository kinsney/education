import misago from 'misago/index';

import 'misago/initializers/reducers/auth';

import 'misago/initializers/modal';
import 'misago/initializers/ajax';
import 'misago/initializers/store';
import 'misago/initializers/auth';

import 'misago/initializers/components/user-menu';


export default function Misago(context)
{
	if(context) misago.init(context);
}