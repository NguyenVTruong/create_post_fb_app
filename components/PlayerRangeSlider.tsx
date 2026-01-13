import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, {useState} from "react";

type PlayerRangeSliderProps = {
    value: [number, number];
    onFinish: (val: [number, number]) => void;
};

const PlayerRangeSlider = React.memo(function PlayerRangeSlider({
                                                                    value,
                                                                    onFinish,
                                                                }: PlayerRangeSliderProps) {

    const [tempRange, setTempRange] = useState([8, 9]);

    return (
        <>
            <MultiSlider
                values={tempRange}
                onValuesChange={(values) => setTempRange(values)} // chỉ thay đổi UI tạm thời
                onValuesChangeFinish={(values) => onFinish(values as [number, number])} // chỉ cập nhật state thực khi kéo xong
                min={4}
                max={20}
                step={1}
                snapped
                sliderLength={300}
                allowOverlap={false}
                selectedStyle={{ backgroundColor: '#2F6FED' }}
                markerStyle={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    backgroundColor: '#2F6FED',
                }}
            />
        </>
    );
});

export default PlayerRangeSlider;