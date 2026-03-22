//package com.app.intellicart.converter;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.persistence.AttributeConverter;
//import jakarta.persistence.Converter;
//import org.postgresql.util.PGobject;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Converter(autoApply = false)
//public class JsonbConverter implements AttributeConverter<Map<String, Object>, PGobject> {
//
//    private static final ObjectMapper objectMapper = new ObjectMapper();
//
//    @Override
//    public PGobject convertToDatabaseColumn(Map<String, Object> attribute) {
//        try {
//            PGobject pgObject = new PGobject();
//            pgObject.setType("jsonb");
//            pgObject.setValue(objectMapper.writeValueAsString(attribute));
//            return pgObject;
//        } catch (Exception e) {
//            throw new IllegalArgumentException("Error converting Map to JSONB", e);
//        }
//    }
//
//    @Override
//    public Map<String, Object> convertToEntityAttribute(PGobject dbData) {
//        try {
//            if (dbData == null || dbData.getValue() == null) {
//                return new HashMap<>();
//            }
//            return objectMapper.readValue(dbData.getValue(),
//                    new TypeReference<Map<String, Object>>() {});
//        } catch (Exception e) {
//            throw new IllegalArgumentException("Error converting JSONB to Map", e);
//        }
//    }
//}