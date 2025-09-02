import {useEffect, useRef, useCallback, useState} from 'react';
import { Canvas, Rect, IText, Image as FabricImage } from 'fabric';
// 사용한 컴포넌트
import Button from '../../../components/common/forms/Button.jsx'
import ImageGeneratorAiSetting from '../../../components/ImageGeneratorAiSetting.jsx';
import ImageUploadDropzone from '../../../components/fileUpload/ImageUploadDropzone.jsx';

// 탭 관련
/* 탭 버튼 이미지 */
import Tab1 from "../../../assets/images/icon/ai_setting1.svg?react";
import TabActive1 from "../../../assets/images/icon/ai_setting1_active.svg?react";
import Tab2 from "../../../assets/images/icon/ai_setting2.svg?react";
import TabActive2 from "../../../assets/images/icon/ai_setting2_active.svg?react";
import Tab3 from "../../../assets/images/icon/ai_setting3.svg?react";
import TabActive3 from "../../../assets/images/icon/ai_setting3_active.svg?react";
import Tab4 from "../../../assets/images/icon/ai_setting4.svg?react";
import TabActive4 from "../../../assets/images/icon/ai_setting4_active.svg?react";
import AiSettingStyleEffectTab from "../../../components/aiSetting/AiSettingStyleEffectTab.jsx";
import AiSettingImageSizeTab from "../../../components/aiSetting/AiSettingImageSizeTab.jsx";
import AiSettingTextTab from "../../../components/aiSetting/AiSettingTextTab.jsx";
import AiSettingObjectTab from "../../../components/aiSetting/AiSettingObjectTab.jsx";
// 데이터 정리
const imageTabItems = [ /* AiSettingImageSizeTab용 데이터 */ ];
const styleTabItems = [ /* AiSettingStyleEffectTab용 데이터 */ ];
const textTabItems = [
  // 기존 imageList
  {
    title: '타이틀/헤드라인',
    eventTitle: 'addTitle',
    tabType: 'text',
    items: [
      { id: 'add_title_1', src:'/src/assets/images/text/title1.png', url: { VT323: 'https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2' } },
      { id: 'add_title_2', src:'/src/assets/images/text/title2.png', url: { Pacifico: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2' } },
    ]
  },
  {
    title: '서브텍스트',
    eventTitle: 'addSubtext',
    tabType: 'subText',
    items: [
      { id: 'add_title_1', src:'/src/assets/images/text/title1.png', url: { VT323: 'https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2' } },
      { id: 'add_title_2', src:'/src/assets/images/text/title2.png', url: { Pacifico: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2' } },
    ]
  },
  {
    title: '텍스트효과',
    eventTitle: 'addTextEffect',
    tabType: 'addTextEffect',
    items: [
      { id: 'add_title_1', src:'/src/assets/images/text/title1.png', url: { VT323: 'https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2' } },
      { id: 'add_title_2', src:'/src/assets/images/text/title2.png', url: { Pacifico: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2' } },
    ]
  },
  {
    title: 'SNS 스타일 문구',
    eventTitle: 'addSnsText',
    tabType: 'addSnsText',
    items: [
      { id: 'add_title_1', src:'/src/assets/images/text/title1.png', url: { VT323: 'https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2' } },
      { id: 'add_title_2', src:'/src/assets/images/text/title2.png', url: { Pacifico: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2' } },
    ]
  },
  {
    title: '이벤트/시즌 문구',
    eventTitle: 'addEventText',
    tabType: 'addEventText',
    items: [
      { id: 'add_title_1', src:'/src/assets/images/text/title1.png', url: { VT323: 'https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2' } },
      { id: 'add_title_2', src:'/src/assets/images/text/title2.png', url: { Pacifico: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2' } },
    ]
  }
];
const objectTabItems = [ /* AiSettingObjectTab용 데이터 */ ];

const EditContentsImage = () => {
  const lists = [
    {
      key: 'image',
      title: '이미지 조절',
      icon: Tab1,
      iconActive: TabActive1,
      items: imageTabItems,
      component: AiSettingImageSizeTab
    },
    {
      key: 'style',
      title: '스타일 효과',
      icon: Tab2,
      iconActive: TabActive2,
      items: styleTabItems,
      component: AiSettingStyleEffectTab
    },
    {
      key: 'text',
      title: '텍스트',
      icon: Tab3,
      iconActive: TabActive3,
      items: textTabItems,
      component: AiSettingTextTab
    },
    {
      key: 'object',
      title: '오브젝트',
      icon: Tab3,
      iconActive: TabActive3,
      items: objectTabItems,
      component: AiSettingObjectTab
    },
  ];
  // 이미지 업로드 관련
  const [files, setFiles] = useState([]); // 업로드된 파일 저장
  const [resetKey, setResetKey] = useState(0);   // 드롭존 내부도 리셋하고 싶을 때 사용(강제 재마운트용)

  // fabric.js 설정 관련
  const wrapRef = useRef(null);// 캔버스 컨테이너 div
  const domCanvasRef = useRef(null); // 실제 <canvas> 엘리먼트
  const initialState = useRef([]);
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const fabricRef = useRef(null);// Fabric.js 캔버스 인스턴스 저장


  // 초기 이미지 업로드
  useEffect(() => {
    if (!files || !domCanvasRef.current) return;

    const canvas = new Canvas(domCanvasRef.current, {
      backgroundColor: 'transparent',
      selection: true,
      preserveObjectStacking: true,
      enableRetinaScaling: true,
    });
    fabricRef.current = canvas;

    // 컨테이너 크기 동기화
    const wrap = wrapRef.current;
    const syncSize = () => {
      const w = Math.max(1, wrap?.clientWidth ?? 0);
      const h = wrap?.clientHeight > 0 ? wrap.clientHeight : Math.round((w * 2) / 3);
      canvas.setWidth(w);
      canvas.setHeight(h);
      canvas.requestRenderAll();
    };
    syncSize();

    let ro;
    if (wrap && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => syncSize());
      ro.observe(wrap);
    }

    // 마우스 휠 줌
    const onWheel = (opt) => {
      const e = opt.e;
      let zoom = canvas.getZoom();
      zoom *= Math.pow(0.999, e.deltaY);
      zoom = Math.max(0.2, Math.min(5, zoom));
      canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom);
      e.preventDefault();
      e.stopPropagation();
    };
    canvas.on('mouse:wheel', onWheel);

    // 파일 → 이미지 추가
    const file = Array.isArray(files) ? files[0] : files;
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      const imgElement = document.createElement("img");
      imgElement.src = objectUrl;

      imgElement.onload = () => {
        // fabric 이미지 객체 생성
        const fabricImg = new FabricImage(imgElement);

        // 캔버스 정리 (배경 유지)
        canvas.getObjects().forEach((o) => canvas.remove(o));

        // 비율 맞춰 스케일 조정
        const cw = canvas.getWidth();
        const ch = canvas.getHeight();
        const scale = Math.min(cw / imgElement.width, ch / imgElement.height);
        fabricImg.scale(scale);
        fabricImg.set({
          left: (cw - imgElement.width * scale) / 2,
          top: (ch - imgElement.height * scale) / 2,
        });

        canvas.add(fabricImg);
        canvas.sendToBack(fabricImg);
        canvas.setActiveObject(fabricImg);
        canvas.requestRenderAll();
        // ✅ 초기 상태 저장
        initialState.current = canvas.toJSON();  // 항상 복원 가능한 초기 상태
        undoStack.current.push(canvas.toJSON());
        redoStack.current = [];
        URL.revokeObjectURL(objectUrl); // 메모리 해제
      };
    }
    return () => {
      canvas.off('mouse:wheel', onWheel);
      ro?.disconnect();
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [files]);
  //  이미지 업로드 후 (canvas활성화 이후 요소 삭제) :Delete / Backspace 키 누를 시 삭제됨
  useEffect(() => {
    const handleKeyDown = (e) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const activeObject = canvas.getActiveObject();

      // 텍스트 편집 중이면 삭제 무시
      if (activeObject?.isEditing) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelectedObjects();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReset = () => {
    console.log('여기')
    // 기존 파일 blob URL 정리
    // files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));

    console.log(fabricRef)
    // Fabric 캔버스 초기화
    if (fabricRef.current) {
      console.log('요소 초기화')
      fabricRef.current.dispose(); // 기존 Fabric 객체 제거
      const canvasEl = domCanvasRef.current;
      if (canvasEl) {
        canvasEl.getContext('2d').clearRect(0, 0, canvasEl.width, canvasEl.height); // 화면 초기화
      }
      fabricRef.current = null;
    }

    // 파일 상태 초기화
    setFiles([]);
    setResetKey(k => k + 1); // 드롭존 강제 리셋
    saveState(); // 상태 저장
  };
  const addObject = (obj) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    canvas.add(obj);
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();

    // 객체 단위로 undo 기록
    undoStack.current.push({ action: 'add', object: obj });
    redoStack.current = [];
  };
  // 텍스트 추가
  const handleItemClick = async (tabType, eventTitle, item) => {
    console.log('최상위에서 받은 이벤트:', tabType, eventTitle, item);

    const canvas = fabricRef.current;
    if (!canvas) return;

    // 1. 폰트 로드 (중복 로드 방지용)
    const fontName = Object.keys(item.url)[0];
    const fontUrl = item.url[fontName];
    const font = new FontFace(fontName, `url(${fontUrl})`);
    await font.load();
    document.fonts.add(font);
    // 특정 폰트가 확실히 로드될 때까지 대기
    await document.fonts.load(`1em ${fontName}`);
    // 2. Fabric.js에 텍스트 추가
    const text = new IText('Correctly loaded VT323', {
      left: 50,
      top: 50,
      fontFamily: fontName,
      fontSize: 40,
      fill: '#222',
    });
    addObject(text);
  };
  // 요소 삭제
  const deleteSelectedObjects = () => {
    const canvas = fabricRef.current;
    const activeObjects = canvas.getActiveObjects();

    activeObjects.forEach(obj => {
      canvas.remove(obj);
      undoStack.current.push({ action: 'remove', object: obj });
    });

    canvas.discardActiveObject();
    canvas.requestRenderAll();
    redoStack.current = [];
  };
  /* 상태 조작 */
  const saveState = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    // 현재 상태를 undo 스택에 저장
    undoStack.current.push(canvas.toJSON());
    // redo 스택 초기화
    redoStack.current = [];
  };
  // 요소 삭제 (한단계 전)
  const handleUndo = () => {
    const canvas = fabricRef.current;
    if (!canvas || undoStack.current.length === 0) return;

    const lastAction = undoStack.current.pop();
    console.log('lastAction', lastAction)

    switch (lastAction.action) {
      case 'add':
        canvas.remove(lastAction.object);
        break;
      case 'remove':
        canvas.add(lastAction.object);
        break;
      case 'modify':
        lastAction.object.set(lastAction.prevState);
        break;
    }

    canvas.requestRenderAll();
    redoStack.current.push(lastAction); // Redo 스택에 기록
  };
  // 요소 삭제 (한단계 후)
  const handleRedo = () => {
    const canvas = fabricRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    const lastUndone = redoStack.current.pop();

    switch (lastUndone.action) {
      case 'add':
        canvas.add(lastUndone.object);
        break;
      case 'remove':
        canvas.remove(lastUndone.object);
        break;
      case 'modify':
        lastUndone.object.set(lastUndone.newState);
        break;
    }

    canvas.requestRenderAll();
    undoStack.current.push(lastUndone); // Undo 스택에 다시 기록
  };
  // 요소 삭제 (처음 단계)
  const handleGoFirstStep = () => {
    console.log(initialState)
    const canvas = fabricRef.current;
    const initialImageExists = canvas.getObjects().some(obj => {
      return obj.type === 'image' && obj._element?.src === initialState.current.objects[0].src;
    });

    if (!initialImageExists) {
      console.log('초기 이미지가 사라졌어. 복원함');
      // 초기 이미지 다시 넣기
      console.log(initialState.current)
      const objectUrl = URL.createObjectURL(initialState.current.file);
      console.log(objectUrl)
      const imgElement = document.createElement("img");
      imgElement.src = objectUrl;
      console.log('imgElement', imgElement)

      imgElement.onload = () => {
        const fabricImg = new FabricImage(imgElement);
        fabricImg.scale(initialState.current.scale);
        fabricImg.set({
          left: initialState.current.left,
          top: initialState.current.top,
        });
        canvas.add(fabricImg);
        canvas.sendToBack(fabricImg);
        canvas.requestRenderAll();

        // Undo/Redo 스택 초기화
        undoStack.current = [canvas.toJSON()];
        redoStack.current = [];
        URL.revokeObjectURL(objectUrl);
      };

    } else {
      console.log('초기 이미지가 이미 존재함');
    }
  };


  // 유틸: 이미지 URL로 추가
  const addImageFromUrl = useCallback((url) => {
    const canvas = fabricRef.current;
    if (!canvas || !url) return;
    Image.fromURL(
      url,
      (img) => {
        img.set({ left: 150, top: 120 });
        const maxWidth = canvas.getWidth() * 0.8;
        if (img.width > maxWidth) {
          const scale = maxWidth / img.width;
          img.scale(scale);
        }
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  }, []);

  // 유틸: PNG로 내보내기
  const exportPNG = useCallback(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({ format: 'png', quality: 1 });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'canvas.png';
    a.click();
  }, []);

  return (
    <div className="generator-content-wrap">
      <ImageGeneratorAiSetting
        lists={lists}
        onItemClick={handleItemClick}  // 상위에서 정의한 클릭 이벤트 전달
      />
      <div className="generator-box bg-ver">
        {/*<div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => addText()}>텍스트 추가</button>
          <button type="button" onClick={() => addImageFromUrl('https://picsum.photos/600/400')}>이미지 추가</button>
          <button type="button" onClick={exportPNG}>PNG로 저장</button>
        </div>*/}
        { files.length === 0 ? (
          /* 업로드한 파일이 없을 경우 */
          <div className="upload-generator-file">
            <div className="upload-generator-title">
              <p>IGen AI 편집 도구에 오신 걸 환영합니다!</p>
              <span>편집할 이미지를 업로드하거나 선택해보세요</span>
            </div>
            <ImageUploadDropzone
              key={resetKey}
              onFileSelected={setFiles}
              multiple={false}
              accept={{ 'image/*': ['.jpg', '.png', '.svg'] }}
            />
          </div>
        ): (
          /* 업로드한 파일이 있을 경우 */
          <div
            ref={wrapRef}
            style={{
              width: '100%',        // 부모 너비에 맞춤
              aspectRatio: '1', // 높이 비율(필요에 맞게 변경). 또는 height: 400 로 고정도 OK
              position: 'relative',
              height: '100%'
            }}
          >
            <canvas ref={domCanvasRef} className="edit-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            <Button
              className={'normal ico-reset absolute-ver top-right'}
              onClick={handleReset}
            >
              초기화
            </Button>
            <div className="generator-goback-wrap">
              <Button
                className={'ico-reset-back'}
                onClick={handleUndo}
              >
                <span className="sr-only">한단계 전으로</span>
              </Button>
              <Button
                className={'ico-reset-future'}
                onClick={handleRedo}
              >
                <span className="sr-only">한단계 후로</span>
              </Button>
              <Button
                className={'ico-reset-first'}
                onClick={handleGoFirstStep}
              >
                reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditContentsImage;