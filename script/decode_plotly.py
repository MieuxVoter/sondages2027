import json
import base64
import struct

# Lire le fichier JSON
with open('/Users/borisvilboux/free/jm-tracker-react/src/data/exemple.json', 'r') as f:
    plotly_data = json.load(f)

# Fonction pour décoder les données base64
def decode_base64_data(bdata):
    decoded_bytes = base64.b64decode(bdata)
    # Les données sont stockées en float64 (8 bytes par valeur)
    values = struct.unpack(f'{len(decoded_bytes)//8}d', decoded_bytes)
    return list(values)

# Extraire les données de chaque série
series_data = []
for trace in plotly_data['data']:
    name = trace['name']
    color = trace['marker']['color']
    x_data = decode_base64_data(trace['x']['bdata'])
    y_labels = trace['y']

    series_data.append({
        'name': name,
        'color': color,
        'data': x_data,
        'y_labels': y_labels
    })

    print(f"Série: {name}")
    print(f"Couleur: {color}")
    print(f"Nombre de valeurs: {len(x_data)}")
    print(f"Premières valeurs: {x_data[:3]}")
    print("---")

# Afficher les candidats
print("Candidats:")
for i, candidate in enumerate(plotly_data['data'][0]['y']):
    print(f"{i}: {candidate}")

# Créer la configuration ECharts
echarts_config = {
    "title": {
        "text": "Evaluation au jugement majoritaire",
        "subtext": "date: 2025-01-09, source: IPSOS, commanditaire: La Tribune Dimanche",
        "left": "center",
        "textStyle": {
            "fontWeight": "bold"
        }
    },
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "shadow"
        },
        "formatter": "{b}<br/>{a}: {c}%"
    },
    "legend": {
        "data": [s['name'] for s in series_data],
        "bottom": 0,
        "orient": "horizontal"
    },
    "grid": {
        "left": "15%",
        "right": "4%",
        "bottom": "15%",
        "top": "15%",
        "containLabel": True
    },
    "xAxis": {
        "type": "value",
        "min": 0,
        "max": 100,
        "axisLabel": {
            "formatter": "{value}%"
        },
        "splitLine": {
            "show": True
        }
    },
    "yAxis": {
        "type": "category",
        "data": [candidate.replace('<b>', '').replace('</b>', '').split('<br>')[0].strip()
                for candidate in plotly_data['layout']['yaxis']['ticktext']],
        "axisLabel": {
            "fontSize": 12
        }
    },
    "series": []
}

# Ajouter les séries à la configuration ECharts
for series in series_data:
    echarts_series = {
        "name": series['name'],
        "type": "bar",
        "stack": "satisfaction",
        "data": series['data'],
        "itemStyle": {
            "color": series['color'].replace('rgb(', 'rgba(').replace(')', ', 1)')
        },
        "barWidth": "60%"
    }
    echarts_config['series'].append(echarts_series)

# Sauvegarder la configuration ECharts
with open('/Users/borisvilboux/free/jm-tracker-react/src/data/echarts_config.json', 'w', encoding='utf-8') as f:
    json.dump(echarts_config, f, ensure_ascii=False, indent=2)

print("\nConfiguration ECharts créée et sauvegardée dans echarts_config.json")