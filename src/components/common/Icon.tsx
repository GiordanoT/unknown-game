import exp from "constants";

interface Props {
    code: string;
    name: string;
}
function Icon(props: Props) {
    let link = 'https://www.svgrepo.com/show/';
    link += props.code + '/';
    link += props.name + '.svg';
    return(<img style={{height: '1.5rem', width: '1.5rem'}} src={link} alt={'icon'} />);
}

export default Icon;
