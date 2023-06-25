const determineLocation = (data, lang) => {
    let templocation
    if (data) {

        if (lang === "EN") {
            templocation = (data.country_en || data.state_en) && data.city_en ?
                data.city_en + ', ' :
                data.city_en ?
                    data.city_en :
                    ""
            templocation += data.country_en && data.state_en ?
                data.state_en + ", " :
                data.state_en ?
                    data.state_en :
                    ""
            templocation += data.country_en ?
                data.country_en : ''

        } else {
            templocation = data.country_ja ?
                data.country_ja : ''
            templocation += data.country_ja && data.state_ja ?
                "、 " + data.state_ja :
                data.state_ja ?
                    data.state_ja :
                    ""
            templocation += (data.country_ja || data.state_ja) && data.city_ja ?
                '、 ' + data.city_ja :
                data.city_ja ?
                    data.city_ja :
                    ""
        }
        return templocation
    }
}

export default determineLocation