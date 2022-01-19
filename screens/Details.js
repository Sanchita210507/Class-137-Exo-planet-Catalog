import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import axios from "axios"
import { Card } from "react-native-elements";

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url: `https://d099-116-74-211-55.ngrok.io/planet?name=${this.props.navigation.getParam("planet_name")}`


        };
    }

    componentDidMount() {
        this.getDetails();
    }
    getDetails = () => {
        const { url } = this.state;
        axios
            .get(url)
            .then(response => {
                this.setDetails(response.data.data);
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    };

    setDetails = planetDetails => {
        const planetType = planetDetails.planet_type;
        let imgPath = ""
        switch (planetType) {
            case "Gas Giant":
                imgPath = require("../assets/planet/gas_giant.png");
                break;
            case "Super Earth":
                imgPath = require("../assets/planet/super_earth.png");
                break;
            case "Neptune Like":
                imgPath = require("../assets/planet/neptune_like.png");
                break;
            case "Terrestrial":
                imgPath = require("../assets/planet/terrestrial.png");
                break;
            default:
                imgPath = require("../assets/planet/gas_giant.png");

        }
        this.setState({ details: planetDetails, imagePath: imgPath })
    };

    render() {
        const { details, imagePath } = this.state;
        if (details.specifications) {
            return (
                <View style={styles.container}>
                    <Card
                        title={details.name}
                        image={imagePath}
                        imageProps={{ resizeMode: "contain", width: "100%" }} >
                        <View>
                            <Text style={styles.cardItem} >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                            <Text style={styles.cardItem} >{`Distance from their Sun : ${details.distance_from_their_sun}`}</Text>
                            <Text style={styles.cardItem} >{`Gravity : ${details.gravity}`}</Text>
                            <Text style={styles.cardItem} >{`Orbital Period : ${details.orbital_period}`}</Text>
                            <Text style={styles.cardItem} >{`Orbital Speed : ${details.orbital_speed}`}</Text>
                            <Text style={styles.cardItem} >{`Planet Mass : ${details.planet_mass}`}</Text>
                            <Text style={styles.cardItem} >{`Planet Radius : ${details.planet_radius}`}</Text>
                            <Text style={styles.cardItem} >{`Planet Type : ${details.planet_type}`}</Text>
                        </View>

                        <View style={[styles.cardItem, { flexDirection: "column" }]} >

                            <Text> {details.specifications ? `Specification : ` : ""}</Text>
                            {details.specifications.map((item, index) => (
                                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                                    {item}
                                </Text>
                            ))}


                        </View>


                    </Card>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardItem: {
        marginBottom: 10
    }
});
