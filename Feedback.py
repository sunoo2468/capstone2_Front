import numpy as np
import pandas as pd
import joblib
import sys
import json

# 1. 학습된 모델 로드
model_file_path = '/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/firefighters_vehicle_model.pkl'  # 학습된 모델 파일 경로
model = joblib.load(model_file_path)

# 2. 예측 함수 정의
def predict_firefighting_resources(input_data):
    """
    입력 데이터를 기반으로 소방대원 수와 소방차의 수를 예측합니다.
    """
    # 학습에 사용된 피처 이름과 입력 데이터를 매핑
    transformed_input = {
        '날씨 상황': input_data['weather'],
        '교통 상황': input_data['traffic_condition'],
        '화재 크기': input_data['fire_size'],
        '화재 유형': input_data['fire_type']
    }

    # DataFrame으로 변환
    input_df = pd.DataFrame([transformed_input])
    
    # 예측 수행
    predictions = model.predict(input_df)
    
    # 예측 결과 반환
    results = {
        "firefighter": int(round(predictions[0, 0])),
        "ambulance": int(round(predictions[0, 1])),
        "water": int(round(predictions[0, 2])),
        "ladder": int(round(predictions[0, 3])),
        "pumper": int(round(predictions[0, 4]))
    }
    
    return results

# 3. 외부에서 전달받은 데이터를 처리하고 결과를 출력
def handle_input():
    # input_data는 JSON 형식으로 전달됨
    input_data = json.loads(sys.argv[1])  # 첫 번째 인수로 받은 JSON 데이터
    
    predictions = predict_firefighting_resources(input_data)
    
    # 예측 결과를 JSON 형식으로 출력 (JavaScript에서 받아볼 수 있도록)
    print(json.dumps(predictions))

# 4. 스크립트 실행 시 함수 호출
if __name__ == "__main__":
    handle_input()
