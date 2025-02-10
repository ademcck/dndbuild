import React from 'react'
import './css/testpage.css'
import CombineSliderTools from '../components/RightBarForStyles/MainCombine/CombineSliderTools';



const reactStyleProperties = [
    {
        category: "Box Model",
        properties: [
            "margin",
            "padding",
            "border",
            "width",
            "height",
            "boxSizing",
            "overflow"
        ]
    },
    {
        category: "Positioning",
        properties: [
            "position",
            // "top",
            // "right",
            // "bottom",
            // "left",
            "zIndex",
            "display",
            "float",
            "clear"
        ]
    },
    {
        category: "Flexbox",
        properties: [
            "flex",
            "flexDirection",
            "flexWrap",
            "flexFlow",
            "justifyContent",
            "alignItems",
            "alignContent",
            "flexGrow",
            "flexShrink",
            "flexBasis",
            "gap"
        ]
    },
    {
        category: "Grid",
        properties: [
            "grid",
            "gridTemplateColumns",
            "gridTemplateRows",
            "gridTemplateAreas",
            "gridGap",
            "gridColumn",
            "gridRow",
            "gridArea"
        ]
    },
    {
        category: "Typography",
        properties: [
            "fontFamily",
            "fontSize",
            "fontWeight",
            "fontStyle",
            "lineHeight",
            "textAlign",
            "textDecoration",
            "textTransform",
            "letterSpacing",
            "wordSpacing",
            "whiteSpace"
        ]
    },
    {
        category: "Visual",
        properties: [
            "background",
            "backgroundColor",
            "backgroundImage",
            "backgroundPosition",
            "backgroundSize",
            "backgroundRepeat",
            "color",
            "opacity",
            "visibility",
            "boxShadow",
            "textShadow",
            "cursor"
        ]
    },
    {
        category: "Transform",
        properties: [
            "transform",
            "transformOrigin",
            "translate",
            "rotate",
            "scale",
            "skew",
            "transition",
            "animation",
            "perspective"
        ]
    },
    {
        category: "Lists",
        properties: [
            "listStyle",
            "listStyleType",
            "listStylePosition",
            "listStyleImage"
        ]
    },
    {
        category: "Tables",
        properties: [
            "tableLayout",
            "borderCollapse",
            "borderSpacing",
            "captionSide",
            "emptyCells"
        ]
    },
    {
        category: "Dimensions",
        properties: [
            "maxWidth",
            "minWidth",
            "maxHeight",
            "minHeight",
            "aspectRatio",
            "objectFit",
            "objectPosition"
        ]
    }
];




export default function TestPage() {


    return (
        <>
            {/* <div className='w-screen max-h-full flex justify-center flex-col items-center overflow-auto'>
                <List className=" p-5 bg-slate-500" sx={style}>
                    <ListItem>
                        <FormControl className='w-full'>
                            <div className='flex justify-between items-center w-full' >
                                <TextField id="outlined-basic" style={{ width: '60%' }} label="Outlined" variant="outlined" inputtype={typeInput} />
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    className='w-30'
                                    value={typeInput}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="value" control={<Radio />} label="Value" />
                                    <FormControlLabel value="id" control={<Radio />} label="Id" />
                                </RadioGroup>
                            </div>
                        </FormControl>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    {reactStyleProperties.map((category, index) => (
                        <ListItem key={index} className="flex flex-col">
                            <FormLabel>{category.category}</FormLabel>
                            <Autocomplete disablePortal options={category.properties.map(prop => ({ label: prop }))} style={{ width: "100%" }} renderInput={(params) => <TextField {...params} label="Seçenekler" />} />
                        </ListItem>
                    ))}

                </List>
            </div> */}
            <CombineSliderTools />

        </>
    )
}

