import SvgUri from 'react-native-svg-uri';

type Props = {
    width?:Number,
    height?:Number,
    source?:string
}
const SvgIcon = (props:Props)=>{
    const {width, height, source} = props;
    return(
        <SvgUri
            width={`${width}`}
            height={`${height}`}
            svgXmlData={source}
        />
    )
}

export default SvgIcon;