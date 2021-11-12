import React, { Component } from "react";
import axios from "axios";
import { Box, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import Verse from "../components/Verse";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "../index.css";

const BgHeading = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  return bgColor;
};

export default class Surah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surahName: "",
      surahTranslation: "",
      bismillah: "",
      numSurah: this.props.match.params.id,
      versesNum: "",
      verses: [],
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get(
        `https://api.quran.sutanlab.id/surah/${this.state.numSurah}`
      );
      res.data.data.number !== 1 && res.data.data.number !== 9
        ? this.setState({
            surahName: res.data.data.name.transliteration.id,
            surahTranslation: res.data.data.name.translation.id,
            bismillah: res.data.data.preBismillah.text.arab,
            versesNum: res.data.data.numberOfVerses,
            verses: res.data.data.verses,
          })
        : this.setState({
            surahName: res.data.data.name.transliteration.id,
            surahTranslation: res.data.data.name.translation.id,
            versesNum: res.data.data.numberOfVerses,
            verses: res.data.data.verses,
          });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <Box
        border={{ base: "0px", md: "1px" }}
        borderColor={{ base: null, md: "brand.900" }}
      >
        <Flex
          textAlign="center"
          py={2}
          position="sticky"
          top={20}
          bgColor={BgHeading}
          justifyContent="space-around"
          alignItems="center"
        >
          <Box>
            {this.state.numSurah === "1" ? null : (
              <Text
                onClick={() =>
                  this.props.history.push(
                    `/surah/${parseInt(this.state.numSurah) - 1}`
                  )
                }
              >
                <BsArrowLeftCircleFill size={24} color="#aaaaaa" />
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize={20}>{this.state.surahName}</Text>
            <Text fontSize={16}>
              {this.state.surahTranslation} - {this.state.versesNum} ayat
            </Text>
          </Box>
          <Box>
            {this.state.numSurah === "114" ? null : (
              <Text
                onClick={() =>
                  this.props.history.push(
                    `/surah/${parseInt(this.state.numSurah) + 1}`
                  )
                }
              >
                <BsArrowRightCircleFill size={24} color="#aaaaaa" />
              </Text>
            )}
          </Box>
        </Flex>
        <Box px={4}>
          <Box py={4}>
            <Text className="arabic" fontSize={32} textAlign="right">
              {this.state.bismillah}
            </Text>
          </Box>
          <Box>
            {this.state.verses.map((verse) => {
              return <Verse key={verse.number.inSurah} verse={verse} />;
            })}
          </Box>
        </Box>
      </Box>
    );
  }
}
